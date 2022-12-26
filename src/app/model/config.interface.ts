
interface Envio{
  monto_min_mexicanos: number,
  monto_min_dolares: number,
  envio_activacion : string,
}

interface Categorias{
    categoria1: Categoria[],
    categoria2: Subcategoria[],
    categoria3: Subcategoria[],
    [key: string]: any
}

interface Categoria{
  _id: string,
  nombre: string,
  descripcion: string,
  icono?: String
}

interface Subcategoria{
    _id: string,
    categoriaPadre: string,
    nombre: string,
    descripcion: string,
    icono?: String
}

export interface Config{
  nombreTienda: string,
  logo?: {
    name: string,
    secure_url: string,
    public_id: String
  },
  envio: Envio
  categorias: Categorias
}