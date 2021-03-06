import useSupabase from "src/boot/supabase";
import UseAuthUser from "src/composables/UseAuthUser";
import { v4 as uuidv4 } from "uuid";

export default function useApi() {

  const { supabase } = useSupabase();
  const { user } = UseAuthUser();

  /**
   * Retorna todos dos dados disponiveis na tabela passada como parâmetro.
   */
  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select("*");
    if (error) throw error;
    return data;
  };

  /**
  * Retorna uma tupla da tabela passada como parâmetro
  * de acordo com o id, também passado como parêmtro.
  */
  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq('id', id);
    if (error) throw error;
    return data[0];
    /**
     * como a busca é por id, caso encontre, basta se retorne o primeiro elemento.
     */
  };

  /**
   * Adiciona uma tupla populada na tabela passada como parâmetro
   * usando os dados do formulário passado como parâmetro.
  */
  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form, // todos os parâmetros do form
          user_id: user.value.id,
        }
      ]);
    if (error) throw error;
    return data[0];
  };

  /**
   * Atualiza uma tupla na tabela passada como parâmetro
   * usando os dados do formulário passado como parâmetro.
   */
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form
      })
      .match({ id: form.id }); // same as "where t.id = form.id"
    if (error) throw error;
    return data[0];
  };

  /**
  * Remove/Deleta uma tupla na tabela passada como parâmetro
  * usando o id passado como parâmetro.
  */
  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id });
    if (error) throw error;
    return data[0];
  };

  /**
   *
   */

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4();
    const { error } = supabase
      .storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  /**
   *
   */

  const getUrlPublic = async (fileName, storage) => {
    const { publicURL, error } = supabase
      .storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;
    return publicURL;
  };

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg
  };
}
