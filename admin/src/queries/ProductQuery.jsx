import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
  addProduct,
  deleteProduct,
  getCategory,
  getProductById,
  getProducts,
  updateProduct,
  getAdvertisement,
  addAdvertisement,
  addWelcomeSection,
  getWelcomeSection,
  editWelcomeSection,
  getWelcomeById,
  deleteWelcome,
  editAds,
  getAdsId,
  deleteAds
} from "./productUrls";

const useGetCategory = (data) => {
  return useQuery(["get_category", data], () => getCategory(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};


const useGetCategorysById = (data) => {
  return useQuery(["get_category", data], () => getCategoryById(data), {
      staleTime: 3000,
      keepPreviousData: true,
      // refetchOnWindowFocus: false,
  });
};

const useEditCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editCategory(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};

const useDeleteCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteCategory(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};

const useGetProducts = (data) => {
  return useQuery(["get_products", data], () => getProducts(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetProductById = (data) => {
  return useQuery(["get_products", data], () => getProductById(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};


const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => updateProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteProduct(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useAddAdvertisement = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addAdvertisement(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_advertisement");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};


const useAddWelcomeSection = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addWelcomeSection(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_category");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useGetWelcomeSection = (data) => {
  return useQuery(["get_welcomeSection", data], () => getWelcomeSection(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetAdvertisement = (data) => {
  return useQuery(["get_advertisement", data], () => getAdvertisement(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useUpdateWelcome = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editWelcomeSection(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useGetWelcomeById = (data) => {
  return useQuery(["get_category", data], () => getWelcomeById(data), {
      staleTime: 3000,
      keepPreviousData: true,
      // refetchOnWindowFocus: false,
  });
};
const useDeleteWelcome = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteWelcome(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};




const useEditAds = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editAds(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_products");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useGetAdsById = (data) => {
  return useQuery(["get_category", data], () => getAdsId(data), {
      staleTime: 3000,
      keepPreviousData: true,
      // refetchOnWindowFocus: false,
  });
};
const useDeleteAds = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteAds(data), {
      onSuccess: (data) => {
          queryClient.invalidateQueries("get_category");
          return data;
      },
      onError: (data) => {
          return data;
      },
  });
};
export {
  useGetCategory,
  useEditCategorys, 
  useGetCategorysById, 
  useDeleteCategorys ,
  useGetProducts,
  useGetProductById,
  useAddCategory,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useAddAdvertisement,
  useAddWelcomeSection,
  useGetWelcomeSection,
  useGetAdvertisement,
  useUpdateWelcome,
  useGetWelcomeById,
  useDeleteWelcome,
  useEditAds, 
  useGetAdsById,
  useDeleteAds
};
