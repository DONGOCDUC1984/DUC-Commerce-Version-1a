import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  productInfo: [],
  productError: false,
  productSuccess: false,
  productLoading: false,
  productMessage: "",
};

export const getproduct = createAsyncThunk(
  "allproducts/get",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.get(url + "getallproducts", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const postproduct = createAsyncThunk(
  "product/post",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        url + "postproduct",
        val,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateproduct = createAsyncThunk(
  "product/update",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        url + `updateproduct/${val.id}`,
        {
          id: val.id,
          newDescription: val.newDescription,
          newPrice: val.newPrice,
        },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        url + `deleteproduct/${id}`,

        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproduct.pending, (state) => {
        state.productLoading = true;
        state.productError = false;
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.productError = false;
        state.productInfo = action.payload;
      })
      .addCase(getproduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      })

      .addCase(postproduct.pending, (state) => {
        state.productLoading = true;
        state.productError = false;
      })
      .addCase(postproduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.productError = false;
        state.productInfo.push(action.payload);
        alert("Product was posted successfully");
      })
      .addCase(postproduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      })

      .addCase(updateproduct.pending, (state) => {
        state.productLoading = true;
        state.productError = false;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.productError = false;
        state.productInfo.map((x) => {
          if (x.id === action.payload.id) {
            x.description = action.payload.description;
            x.price = action.payload.price;
          }
        });
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      })

      .addCase(deleteproduct.pending, (state) => {
        state.productLoading = true;
        state.productError = false;
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.productError = false;
        state.productInfo = state.productInfo.filter(
          (x) => x.id !== action.payload.id
        );
        //console.log("productSlice file, action.payload: ",action.payload)
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });
  },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;
