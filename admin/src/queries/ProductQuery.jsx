import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  addProduct,
  getCategory,
  getProducts,
  addBanner,
  getBanner,
  getAdvertisement,
  addAdvertisement,
  addWelcomeSection,
  getWelcomeSection,
  getOrders,


} from "./productUrls";

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

const useGetCategory = (data) => {
  return useQuery(["get_category", data], () => getCategory(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};
//getOrders
const useGetOrders = (data) =>{

  return useQuery(["get_category", data], () => getOrders(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

}


const useGetProducts = (data) => {
  return useQuery(["get_products", data], () => getProducts(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};



const useGetBanner = (data) => {
  return useQuery(["get_banner", data], () => getBanner(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
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

const useAddBanner = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addBanner(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("add_banner");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

export {
  useGetCategory,
  useGetProducts,
  useGetBanner,
  useAddCategory,
  useAddProduct,
  useAddBanner,
  useAddAdvertisement,
  useGetAdvertisement,
  useGetWelcomeSection,
  useAddWelcomeSection,
  useGetOrders,


};
