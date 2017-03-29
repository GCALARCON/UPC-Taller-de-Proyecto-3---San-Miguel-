using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class IncidenciaEvaluacion
    {
        public string NroIncidenciaProveedor { get; set; }
        public string Fecha{ get; set; }
        public string Descripcion{ get; set; }
        public string Gravedad{ get; set; }
        public int Penalidad{ get; set; }
        
    }
}
