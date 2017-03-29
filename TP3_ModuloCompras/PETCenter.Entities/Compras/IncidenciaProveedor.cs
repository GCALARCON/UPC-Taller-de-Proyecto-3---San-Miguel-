using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class IncidenciaProveedor
    {

        public int idIncidenciaProveedor { get; set; }
        public string NroIncidenciaProveedor { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public int Gravedad { get; set; }
        public string desGravedad { get; set; }
        public string Estado { get; set; }
        public int Penalidad { get; set; }

    }
}
