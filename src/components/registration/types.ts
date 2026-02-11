// RAW DATA FROM BACKEND
export interface Class {
  id: number;
  nama_kelas: string;
  deskripsi: string;
  harga: number;
  link_thumbnail?: string;
  status: string;
  format: string;
  tanggal_mulai?: string;
  kuota?: number;
}

// DATA MAPPING UNTUK COMPONENT UI
export interface ClassItem {
  id: number;
  title: string;
  desc: string;
  price: number;
  image: string;
  status?: string;
  mode?: string;
  quota?: number;
}

// MAPPER: backend → UI format
export const mapClassToItem = (c: Class): ClassItem => ({
  id: c.id,
  title: c.nama_kelas,
  desc: c.deskripsi,
  price: c.harga,
  image: c.link_thumbnail || "",
  status: c.status,
  mode: c.format,
  quota: c.kuota,
});
