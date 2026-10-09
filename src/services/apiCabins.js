import supabase from "./supabase.js";
import { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const action = id ? "edited" : "created";

  let imagePath;
  try {
    imagePath = await uploadCabinImage(newCabin);
  } catch (err) {
    console.error(err);
    throw new Error(`Cabin could not be ${action}!`);
  }
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${action}!`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }
  return data;
}

async function uploadCabinImage(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  if (hasImagePath) return newCabin.image;

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded!");
  }

  return imagePath;
}
