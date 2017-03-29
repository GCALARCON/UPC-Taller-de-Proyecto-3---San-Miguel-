using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class RecursoProveedor
    {
        public int idRecursoProveedor { get; set; }
        public decimal valorUnitario { get; set; }
        public Proveedor proveedor { get; set; }
        public PresentacionRecurso presentacionrecurso { get; set; }

        public bool activo { get; set; }
        public string desactivo { get; set; }

    }
}
