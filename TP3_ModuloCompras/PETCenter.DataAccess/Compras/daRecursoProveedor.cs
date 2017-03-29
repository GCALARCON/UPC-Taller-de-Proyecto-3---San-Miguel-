using Microsoft.Practices.EnterpriseLibrary.Data;
using PETCenter.DataAccess.Configuration;
using PETCenter.Entities.Compras;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace PETCenter.DataAccess.Compras
{
    public class daRecursoProveedor
    {
        private string connectionAzure = "Dangerous";

        public List<RecursoProveedor> GetRecursoProveedor(int idproveedor, int idpresentacion, int idrecurso, int idproveedorecurso)
        {
            Query query = new Query("GPC_USP_VET_SEL_RECURSO_PROVEEDOR");

            query.input.Add(idproveedor);
            query.input.Add(idpresentacion);
            query.input.Add(idrecurso);
            query.input.Add(idproveedorecurso);            
            query.connection = connectionAzure;
            List<RecursoProveedor> ocol = new List<RecursoProveedor>();
            RecursoProveedor be;
            using (IDataReader dr = new DAO().GetCollectionIReader(query))
            {
                while (dr.Read())
                {
                    be = new RecursoProveedor();
                    be.idRecursoProveedor = Convert.ToInt32(dr["idRecursoProveedor"]);
                    be.valorUnitario = Convert.ToDecimal(dr["VALORUNITARIO"]);

                    be.presentacionrecurso = new PresentacionRecurso();
                    be.presentacionrecurso.idpresentacionrecurso = Convert.ToInt32(dr["IDPRESENTACIONRECURSO"]);
                    be.presentacionrecurso.codigo = dr["CODIGOPRESENTACIONRECURSO"].ToString();
                    be.presentacionrecurso.descripcion = dr["DESCRIPCIONPRESENTACIONRECURSO"].ToString();

                    be.proveedor = new Proveedor();
                    be.proveedor.idProveedor = Convert.ToInt32(dr["idProveedor"]);
                    be.proveedor.Codigo = dr["CODIGOPROVEEDOR"].ToString();
                    be.proveedor.RazonSocial = dr["RazonSocial"].ToString();

                    be.presentacionrecurso.recurso = new Recurso();
                    be.presentacionrecurso.recurso.idrecurso = Convert.ToInt32(dr["IDRECURSO"]);
                    be.presentacionrecurso.recurso.codigo = dr["CODIGORECURSO"].ToString();
                    be.presentacionrecurso.recurso.descripcion = dr["DESCRIPCIONRECURSO"].ToString();

                    be.activo = Convert.ToBoolean(dr["Activo"]);
                    be.desactivo = dr["desActivo"].ToString();
                    ocol.Add(be);
                }
            }
            return ocol;
        }

        public int ActualizarRecursoProveedor(RecursoProveedor itemsrecursoproveedor)
        {
            Database db = DatabaseFactory.CreateDatabase(connectionAzure);
            int nresult = -1;
            using (DbConnection connection = db.CreateConnection())
            {
                connection.Open();
                DbTransaction transaction = connection.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                try
                {
                    DbCommand dbCommand;
                    dbCommand = db.GetStoredProcCommand("GPC_USP_VET_UPD_RECURSOPROVEEDOR");
                    db.AddInParameter(dbCommand, "@IDRECURSOPROVEEDOR", System.Data.DbType.Int32, itemsrecursoproveedor.idRecursoProveedor);
                    db.AddInParameter(dbCommand, "@IDPRESENTACIONRECURSO", System.Data.DbType.Int32, itemsrecursoproveedor.presentacionrecurso.idpresentacionrecurso);
                    db.AddInParameter(dbCommand, "@IDPROVEEDOR", System.Data.DbType.Int32, itemsrecursoproveedor.proveedor.idProveedor);
                    db.AddInParameter(dbCommand, "@VALORUNITARIO", System.Data.DbType.Decimal, itemsrecursoproveedor.valorUnitario);
                    db.AddInParameter(dbCommand, "@ACTIVO", System.Data.DbType.Int32, itemsrecursoproveedor.activo);
                    nresult = db.ExecuteNonQuery(dbCommand, transaction);

                    if (nresult == -1)
                        transaction.Rollback();
                    else
                        transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    nresult = -1;
                    throw ex;
                }
                connection.Close();
            }
            db = null;
            return nresult;

        }

        public int ActualizarRecursoProveedorCargaMasiva(RecursoProveedor itemsrecursoproveedor)
        {
            Database db = DatabaseFactory.CreateDatabase(connectionAzure);
            int nresult = -1;
            using (DbConnection connection = db.CreateConnection())
            {
                connection.Open();
                DbTransaction transaction = connection.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                try
                {
                    DbCommand dbCommand;
                    dbCommand = db.GetStoredProcCommand("GPC_USP_VET_UPD_RECURSOPROVEEDOR_CM");
                    db.AddInParameter(dbCommand, "@CODIGOPRESENTACION", System.Data.DbType.String, itemsrecursoproveedor.presentacionrecurso.codigo);
                    db.AddInParameter(dbCommand, "@CODIGOPROVEEDOR", System.Data.DbType.String, itemsrecursoproveedor.proveedor.Codigo);
                    db.AddInParameter(dbCommand, "@VALORUNITARIO", System.Data.DbType.Decimal, itemsrecursoproveedor.valorUnitario);
                    nresult = db.ExecuteNonQuery(dbCommand, transaction);

                    if (nresult == -1)
                        transaction.Rollback();
                    else
                        transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    nresult = -1;
                    throw ex;
                }
                connection.Close();
            }
            db = null;
            return nresult;

        }

    }
}
