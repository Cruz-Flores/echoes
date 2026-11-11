import axios from 'axios';

export const useResource = (resource: string) => {
  const baseUrl = `http://localhost:3000/${resource}`;
  const create = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const response = await axios.post(baseUrl, resource);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message, 'create error');
    }
  };

  const update = async (
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, resource);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message, 'update error');
    }
  };

  const patch = async (
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const response = await axios.patch(`${baseUrl}/${id}`, resource);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message, 'patch error');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAll = async (params?: object): Promise<any> => {
    const response = await axios.get(baseUrl, { params });
    return response.data;
  };

  const service = {
    create,
    getAll,
    update,
    patch,
  };

  return {
    service,
  };
};
