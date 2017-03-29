using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{
    public class CollectionEvaluacionProveedor
    {
        public int nrocolumns { get; set; }
        public List<EvaluacionProveedor> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionEvaluacionProveedor()
        {
            nrocolumns = 0;
            rows = new List<EvaluacionProveedor>();
        }

        public CollectionEvaluacionProveedor(List<EvaluacionProveedor> eval, Transaction transaction)
        {
            nrocolumns = eval.Count();
            rows = eval;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionEvaluacionProveedor(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<EvaluacionProveedor>();
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
