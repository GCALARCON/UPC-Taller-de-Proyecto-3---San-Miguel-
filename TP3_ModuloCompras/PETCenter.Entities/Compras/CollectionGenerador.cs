using PETCenter.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Entities.Compras
{ 
    public class CollectionGenerador
    {
        public int nrocolumns { get; set; }
        public List<Generador> rows { get; set; }
        public string messageType { get; set; }
        public string message { get; set; }


        public CollectionGenerador()
        {
            nrocolumns = 0;
            rows = new List<Generador>();
        }

        public CollectionGenerador(List<Generador> ocol, Transaction transaction)
        {
            nrocolumns = ocol.Count();
            rows = ocol;
            messageType = transaction.type.ToString();
            message = transaction.message;
        }

        public CollectionGenerador(Transaction transaction)
        {
            nrocolumns = 0;
            rows = new List<Generador>(); 
            messageType = transaction.type.ToString();
            message = transaction.message;
        }
    }
}
