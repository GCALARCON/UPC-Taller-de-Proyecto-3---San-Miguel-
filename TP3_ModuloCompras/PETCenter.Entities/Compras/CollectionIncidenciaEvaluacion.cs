using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class CollectionIncidenciaEvaluacion
    {
        public int nrocolumns { get; set; }
        public List<IncidenciaEvaluacion> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionIncidenciaEvaluacion()
        {
            nrocolumns = 0;
            rows = new List<IncidenciaEvaluacion>();
        }

        public CollectionIncidenciaEvaluacion(List<IncidenciaEvaluacion> eval, Transaction transaction)
        {
            nrocolumns = eval.Count();
            rows = eval;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionIncidenciaEvaluacion(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<IncidenciaEvaluacion>();
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
