import request from "../utils/request";

export const fetch = async () => {
   try {
      const response = await request.get("todo");
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export const addToDoItem = async (todo) => {
   try{
      const response = await request.post("todo", todo);
      return response.data;
   }catch(error) {
      console.log(error);
   }
}
export const editToDoItem = async (todo) => {
   try{
      const response = await request.put(`todo/${todo.id}`, todo);
      return response.data;
   }catch(error) {
      console.log(error);
   }
}

export const deleteToDoItem = async (id) => {
   try{
      const response = await request.delete(`todo/${id}`);
      return response.data;
   }catch(error) {
      console.log(error);
   }
}