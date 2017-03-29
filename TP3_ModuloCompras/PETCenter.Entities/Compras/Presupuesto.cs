using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class Presupuesto
    {

        public int idPresupuesto { get; set; }

        public decimal Monto { get; set; }

        public string periodo { get; set; }

    }
}
