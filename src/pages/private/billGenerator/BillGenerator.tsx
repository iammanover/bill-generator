import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./BillGenerator.scss";
import { IFormData, IProduct } from "../../../utils/interface/form.interface";
import {
  Button,
  InputLabel,
  TextField,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { billData } from "../../../store/billSlice";

// modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BillGenerator = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm<IFormData>({
    defaultValues: {
      customerName: "",
      customerMobileNumber: "",
      customerAddress: "",
      billingDate: "",
      products: [
        { productName: "", productQuantity: 0, productPrice: 0, totalPrice: 0 },
      ],
    },
  });

  const dispatch = useDispatch();

  const addProductField = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        productName: "",
        productQuantity: 0,
        productPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  const removeProductField = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const saveData: SubmitHandler<IFormData> = (data: IFormData) => {
    dispatch(billData(data));
    handleOpen();
    reset();
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="bill-generator container-fluid">
      <div>
        <h1 className="title">Bill Generator</h1>
      </div>
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(saveData)}>
          <div className="row">
            <div className="col-md-4">
              <div className="my-3">
                <InputLabel>Customer Name</InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message as string}
                  {...register("customerName", {
                    required: "customer name is required",
                  })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="my-3">
                <InputLabel>Customer Mobile Number</InputLabel>
                <TextField
                  fullWidth
                  type="tel"
                  error={!!errors.customerMobileNumber}
                  helperText={errors.customerMobileNumber?.message as string}
                  {...register("customerMobileNumber", {
                    required: "mobile number is required",
                  })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="my-3">
                <InputLabel>Customer Address</InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  error={!!errors.customerAddress}
                  helperText={errors.customerAddress?.message as string}
                  {...register("customerAddress", {
                    required: "customer  aaddress is required",
                  })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="my-3">
                <InputLabel>Billing Date</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  {...register("billingDate", {
                    required: "billing date is required",
                  })}
                  error={!!errors.billingDate}
                  helperText={errors.billingDate?.message as string}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Product Fields */}
          <div className="mt-4">
            <h3>Products</h3>
            {products.map((product, index) => {
              return (
                <div key={product.id} className="row product-row">
                  <div className="col-md-3">
                    <div className="my-3">
                      <InputLabel>Product Name</InputLabel>
                      <TextField
                        fullWidth
                        {...register(`products.${index}.productName` as const)}
                        defaultValue={product.productName ?? ""}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="my-3">
                      <InputLabel>Quantity</InputLabel>
                      <Controller
                        name={`products.${index}.productQuantity` as const}
                        control={control}
                        defaultValue={product.productQuantity ?? 0}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            type="number"
                            {...field}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              field.onChange(value);
                              setValue(
                                `products.${index}.totalPrice`,
                                value *
                                  (getValues(
                                    `products.${index}.productPrice`
                                  ) ?? 0)
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="my-3">
                      <InputLabel>Price</InputLabel>
                      <Controller
                        name={`products.${index}.productPrice` as const}
                        control={control}
                        defaultValue={product.productPrice ?? 0}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            type="number"
                            {...field}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              field.onChange(value);
                              setValue(
                                `products.${index}.totalPrice`,
                                value *
                                  (getValues(
                                    `products.${index}.productQuantity`
                                  ) ?? 0)
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="my-3">
                      <InputLabel>Total Price</InputLabel>
                      <Controller
                        name={`products.${index}.totalPrice` as const}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextField
                              fullWidth
                              type="number"
                              {...field}
                              disabled
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-end mb-3">
                    <IconButton
                      color="error"
                      onClick={() => removeProductField(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Product Button */}
          <div className="container-fluid">
            <Button
              type="button"
              className="my-4"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              onClick={addProductField}
            >
              Add Fields
            </Button>
          </div>

          {/* Submit Button */}
          <div className="container-fluid">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Save Invoice
            </Button>
          </div>
        </form>
      </div>

      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Invoice is saved successfully</h2>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BillGenerator;
