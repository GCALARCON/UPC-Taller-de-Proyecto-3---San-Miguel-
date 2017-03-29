using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class OrdenCompra
    {

        public int idOrdenCompra { get; set; }
        public string NroOrdenCompra { get; set; }
        public DateTime Fecha { get; set; }
        public int Credito { get; set; }
        public int DiasCredito { get; set; }
        public string Estado { get; set; }
        public int Puntos { get; set; }
        public string TerminoPago { get; set; }

    }
}
