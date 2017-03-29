using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class EvaluacionProveedor
    {
        public int idEvaluacionProveedor { get; set; }
        public string NroEvaluacion { get; set; }
        public string Fecha { get; set; }
        public Proveedor Proveedor { get; set; }
        public string Periodo { get; set; }
        public int Puntaje { get; set; }
        public string Calificado { get; set; }
        public bool VigenteXPeriodo{ get; set; }
        public string RutaVigenteXPeriodo { get; set; }
        public int PuntajeIncidencias { get; set; }
        public int PuntajeOrdenes { get; set; }
    }
}
