using PETCenter.DataAccess.Configuration;
using PETCenter.Entities.Compras;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace PETCenter.DataAccess.Compras
{
    public class daEvaluacionProveedor
    {
        private string connectionAzure = "Dangerous";

        public List<EvaluacionProveedor> GetEvaluaciones_Busqueda(int idevaluacionproveedor, string nroevaluacion, string periodo, int proveedor, int calificado)
        {
            Query query = new Query("GPC_USP_VET_SEL_EVALUACIONPROVEEDOR_BUSQUEDA");
            query.input.Add(idevaluacionproveedor);
            query.input.Add(nroevaluacion);
            query.input.Add(periodo);
            query.input.Add(proveedor);
            query.input.Add(calificado);
            query.connection = connectionAzure;
            List<EvaluacionProveedor> ocol = new List<EvaluacionProveedor>();
            EvaluacionProveedor be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new EvaluacionProveedor();
                    be.idEvaluacionProveedor = Convert.ToInt32(dr["idEvaluacionProveedor"]);
                    be.NroEvaluacion = dr["NroEvaluacion"].ToString();
                    be.Fecha = Convert.ToDateTime(dr["Fecha"]).ToShortDateString();
                    be.Periodo = dr["Periodo"].ToString();
                    be.Puntaje = Convert.ToInt32(dr["Puntaje"]);
                    be.Calificado = dr["Calificado"].ToString();
                    be.VigenteXPeriodo = Convert.ToBoolean(dr["VigenteXPeriodo"]);
                    be.RutaVigenteXPeriodo = dr["RutaVigenteXPeriodo"].ToString();
                    be.PuntajeIncidencias = Convert.ToInt32(dr["PuntajeIncidencias"]);
                    be.PuntajeOrdenes = Convert.ToInt32(dr["PuntajeOrdenes"]);
                    be.Proveedor = new Proveedor();
                    be.Proveedor.idProveedor = Convert.ToInt32(dr["idProveedor"]);
                    be.Proveedor.RazonSocial = dr["RazonSocial"].ToString();                    
                    ocol.Add(be);
                }
            }
            return ocol;
        }

        public int GuardarEvaluacion(string periodo)
        {
            Query query = new Query("GPC_USP_VET_GEN_EVALUACION_FINAL_PROVEEDOR");
            query.input.Add(periodo);
            query.connection = connectionAzure;
            int result = new DAO().ExecuteTransactions(query);
            
            return result;
        }

        public List<Generador> Genera_Evaluacion(string periodo)
        {
            Query query = new Query("GPC_USP_VET_SEL_EVALUACION_PROVEEDOR");
            query.input.Add(periodo);
            query.connection = connectionAzure;
            List<Generador> ocol = new List<Generador>();
            Generador be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new Generador();
                    be.idProveedor = Convert.ToInt32(dr["idProveedor"]);
                    be.Periodo = dr["Periodo"].ToString();
                    be.Puntaje = Convert.ToInt32(dr["Puntaje"]);
                    be.PuntIncidencia = Convert.ToInt32(dr["PuntIncidencia"]);
                    be.PuntTerPago = Convert.ToInt32(dr["PuntTerPago"]);
                    be.RazonSocial = dr["RazonSocial"].ToString();
                    be.PuntajeTotal = (be.Puntaje + be.PuntTerPago) - be.PuntIncidencia;
                    ocol.Add(be);
                }
            }
            return ocol;
        }

        public List<OrdenCompra> GetOrdenCompraxProveedor(string periodo, int idProveedor)
        {
            Query query = new Query("GPC_USP_VET_SEL_ORDENCOMPRAXIDPROVEEDOR");
            query.input.Add(periodo);
            query.input.Add(idProveedor);
            query.connection = connectionAzure;
            List<OrdenCompra> provl = new List<OrdenCompra>();
            OrdenCompra be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new OrdenCompra();
                    be.idOrdenCompra = Convert.ToInt32(dr["idOrdenCompra"]);
                    be.NroOrdenCompra = dr["NroOrdenCompra"].ToString();
                    be.Fecha = Convert.ToDateTime(dr["fecha"]);
                    be.TerminoPago = dr["TerminoPago"].ToString();
                    be.DiasCredito = Convert.ToInt32(dr["DiasCredito"]);
                    be.Puntos = Convert.ToInt32(dr["PuntTerPago"]);
                    provl.Add(be);
                }
            }
            return provl;
        }

        public List<IncidenciaProveedor> GetIncidenciaxProveedor(string periodo, int idProveedor)
        {
            Query query = new Query("GPC_USP_VET_SEL_INCIDENCIAXIDPROVEEDOR");
            query.input.Add(periodo);
            query.input.Add(idProveedor);
            query.connection = connectionAzure;
            List<IncidenciaProveedor> provl = new List<IncidenciaProveedor>();
            IncidenciaProveedor be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new IncidenciaProveedor();
                    be.idIncidenciaProveedor = Convert.ToInt32(dr["idIncidenciaProveedor"]);
                    be.NroIncidenciaProveedor = dr["NroIncidenciaProveedor"].ToString();
                    be.Fecha = Convert.ToDateTime(dr["Fecha"]);
                    be.Descripcion = dr["Descripcion"].ToString();
                    be.desGravedad = dr["desGravedad"].ToString();
                    be.Penalidad = Convert.ToInt32(dr["Penalidad"]);
                    provl.Add(be);
                }
            }
            return provl;
        }

        public List<OrdenCompraEvaluacion> GetDetalleOrdenesEvaluacion(int idevaluacionproveedor)
        {
            Query query = new Query("GPC_USP_VET_SEL_ORDENCOMPRAEVALUACION");
            query.input.Add(idevaluacionproveedor);
            query.connection = connectionAzure;
            List<OrdenCompraEvaluacion> ocol = new List<OrdenCompraEvaluacion>();
            OrdenCompraEvaluacion be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new OrdenCompraEvaluacion();                    
                    be.NroOrdenCompra = dr["NroOrdenCompra"].ToString();
                    be.Fecha = Convert.ToDateTime(dr["Fecha"]).ToShortDateString();
                    be.Credito = dr["Credito"].ToString();
                    be.DiasCredito = Convert.ToInt32(dr["DiasCredito"]);
                    be.Puntaje = Convert.ToInt32(dr["Puntaje"]);                    
                    ocol.Add(be);
                }
            }
            return ocol;
        }

        public List<IncidenciaEvaluacion> GetDetalleIncidenciasEvaluacion(int idevaluacionproveedor)
        {
            Query query = new Query("GPC_USP_VET_SEL_INCIDENCIAEVALUACION");
            query.input.Add(idevaluacionproveedor);
            query.connection = connectionAzure;
            List<IncidenciaEvaluacion> ocol = new List<IncidenciaEvaluacion>();
            IncidenciaEvaluacion be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new IncidenciaEvaluacion();
                    be.NroIncidenciaProveedor = dr["NroIncidenciaProveedor"].ToString();
                    be.Fecha = Convert.ToDateTime(dr["Fecha"]).ToShortDateString();
                    be.Descripcion = dr["Descripcion"].ToString();
                    be.Gravedad = dr["Gravedad"].ToString();                    
                    be.Penalidad = Convert.ToInt32(dr["Penalidad"]);
                    ocol.Add(be);
                }
            }
            return ocol;
        }
    }
}
