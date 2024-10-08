export interface IdentityDni {
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codVerifica: string;
}

export interface IdentityRuc {
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  telefonos: [];
  estado: string;
  condicion: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  ubigeo: string;
  capital: string;
}
