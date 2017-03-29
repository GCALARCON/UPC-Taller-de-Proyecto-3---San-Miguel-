using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class OrdenCompraEvaluacion
    {
        public string NroOrdenCompra { get; set; }
        public string Fecha { get; set; }
        public string Credito { get; set; }
        public int DiasCredito { get; set; }
        public int Puntaje { get; set; }
    }
}
