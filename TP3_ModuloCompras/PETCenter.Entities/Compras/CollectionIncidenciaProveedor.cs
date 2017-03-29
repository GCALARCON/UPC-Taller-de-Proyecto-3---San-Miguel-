using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{ 
    public class CollectionIncidenciaProveedor
    {
        public int nrocolumns { get; set; }
        public List<IncidenciaProveedor> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionIncidenciaProveedor()
        {
            nrocolumns = 0;
            rows = new List<IncidenciaProveedor>();
        }

        public CollectionIncidenciaProveedor(List<IncidenciaProveedor> ocol, Transaction transaction)
        {
            nrocolumns = ocol.Count();
            rows = ocol;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionIncidenciaProveedor(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<IncidenciaProveedor>(); 
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
