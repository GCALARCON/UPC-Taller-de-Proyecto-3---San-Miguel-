using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class CollectionOrdenCompraEvaluacion
    {
        public int nrocolumns { get; set; }
        public List<OrdenCompraEvaluacion> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionOrdenCompraEvaluacion()
        {
            nrocolumns = 0;
            rows = new List<OrdenCompraEvaluacion>();
        }

        public CollectionOrdenCompraEvaluacion(List<OrdenCompraEvaluacion> eval, Transaction transaction)
        {
            nrocolumns = eval.Count();
            rows = eval;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionOrdenCompraEvaluacion(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<OrdenCompraEvaluacion>();
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
