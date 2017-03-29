using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{ 
    public class CollectionRecursoProveedor
    {
        public int nrocolumns { get; set; }
        public List<RecursoProveedor> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionRecursoProveedor()
        {
            nrocolumns = 0;
            rows = new List<RecursoProveedor>();
        }

        public CollectionRecursoProveedor(List<RecursoProveedor> ocol, Transaction transaction)
        {
            nrocolumns = ocol.Count();
            rows = ocol;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionRecursoProveedor(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<RecursoProveedor>(); 
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
