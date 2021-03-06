﻿using PETCenter.DataAccess.Compras;
using PETCenter.DataAccess.Configuration;
using PETCenter.Entities.Common;
using PETCenter.Entities.Compras;
using PETCenter.Entities.Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PETCenter.Logic.Compras
{
    public class blCompras
    {
        #region Proveedor
        public CollectionProveedores GetProveedor_Id(int idproveddor)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                Transaction transaction;
                daCompras da = new daCompras();
                List<Proveedor> provl = da.GetProveedor_Id(idproveddor);
                if (provl.Count() == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No se pudo recuperar la información del proveedor");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "");
                }
                return new CollectionProveedores(provl, transaction);
            }
            catch (Exception ex)
            {
                return new CollectionProveedores(Common.GetTransaction(TypeTransaction.ERR, ex.Message));
            }
        }

        public CollectionProveedores GetProveedores_Busqueda(string tipodocumento, string nrodocumento, string codigoProveedor, string nombreProveedor)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                Transaction transaction;
                daCompras da = new daCompras();
                List<Proveedor> provl = da.GetProveedores_Busqueda(tipodocumento, nrodocumento, codigoProveedor, nombreProveedor);
                if (provl.Count() == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No existen ordenes de compra disponibles");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "");
                }
                return new CollectionProveedores(provl, transaction);
            }
            catch (Exception ex)
            {
                return new CollectionProveedores(Common.GetTransaction(TypeTransaction.ERR, ex.Message));
            }
        }

        public int GeneraProovedor(string razonSocial, string direccion, string tipoDocumento, string numeroDocumento, string telefono, string contacto, string estado, out Transaction transaction)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                daCompras da = new daCompras();
                int result = da.GeneraProveedor(razonSocial,direccion, tipoDocumento,  numeroDocumento,  telefono,  contacto, estado);
                if (result == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No se realizó la transacción");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "Operación realizada satisfactoriamente");
                }
                return result;
            }
            catch (Exception ex)
            {
                transaction = Common.GetTransaction(TypeTransaction.ERR, ex.Message);
                return 0;
            }
        }

        public int ActualizarProveedor(string idProveedor, string direccion, string razonSocial, string tipoDocumento, string numeroDocumento, string telefono, string contacto, string estado, out Transaction transaction)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                daCompras da = new daCompras();
                int result = da.ActualizarProveedor(idProveedor, direccion, razonSocial, tipoDocumento, numeroDocumento, telefono, contacto,estado);
                if (result == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No se realizó la operación");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "Operación realizada satisfactoriamente");
                }
                return result;
            }
            catch (Exception ex)
            {
                transaction = Common.GetTransaction(TypeTransaction.ERR, ex.Message);
                return 0;
            }
        }

        public int DeleteProovedor(string idProveedor, string estado, out Transaction transaction)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                daCompras da = new daCompras();
                int result = da.DeleteProveedor(idProveedor, estado);
                if (result == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No se realizó la transacción");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "");
                }
                return result;
            }
            catch (Exception ex)
            {
                transaction = Common.GetTransaction(TypeTransaction.ERR, ex.Message);
                return 0;
            }
        }

        public int GuardarEvaluacion(string periodo, out Transaction transaction)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                daEvaluacionProveedor da = new daEvaluacionProveedor();
                int result = da.GuardarEvaluacion(periodo);
                if (result == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No se realizó la transacción");
                }
                else
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "Operación realizada satisfactoriamente");
                }
                return result;
            }
            catch (Exception ex)
            {
                transaction = Common.GetTransaction(TypeTransaction.ERR, ex.Message);
                return 0;
            }
        }

        public Proveedor GetProveedor(int idProveedor, out Transaction transaction)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                transaction = Common.GetTransaction(TypeTransaction.OK, "");
                daCompras da = new daCompras();
                Proveedor provl = da.GetProveedor(idProveedor);
                if (provl != null)
                {
                    transaction = Common.GetTransaction(TypeTransaction.ERR, "No existen proveedores disponibles");
                }
                else
                {

                    transaction = Common.GetTransaction(TypeTransaction.OK, "");

                }
                return provl;
            }
            catch (Exception ex)
            {
                transaction = Common.GetTransaction(TypeTransaction.ERR, ex.Message);
                return new Proveedor();
            }
        }
        
        
        #endregion
        
        #region Area
        public CollectionArea GetArea(int idarea)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                Transaction transaction;
                daArea da = new daArea();
                List<Area> ocol = da.GetArea(idarea);
                if (idarea == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "");
                }
                else
                {
                    if (ocol.Count() == 0)
                    {
                        transaction = Common.GetTransaction(TypeTransaction.ERR, "No se pudo recuperar las areas");
                    }
                    else
                    {
                        transaction = Common.GetTransaction(TypeTransaction.OK, "");
                    }
                }
                return new CollectionArea(ocol, transaction);
            }
            catch (Exception ex)
            {
                return new CollectionArea(Common.GetTransaction(TypeTransaction.ERR, ex.Message));
            }
        }
        #endregion

        #region Empleado
        public CollectionEmpleado GetEmpleado(int idEmpleado, int idarea)
        {
            try
            {
                PETCenter.DataAccess.Configuration.DAO dao = new DAO();
                Transaction transaction;
                daEmpleado da = new daEmpleado();
                List<Empleado> ocol = da.GetEmpleado(idEmpleado, idarea);
                if (idEmpleado == 0)
                {
                    transaction = Common.GetTransaction(TypeTransaction.OK, "");
                }
                else
                {
                    if (ocol.Count() == 0)
                    {
                        transaction = Common.GetTransaction(TypeTransaction.ERR, "No se pudo recuperar los empleados");
                    }
                    else
                    {
                        transaction = Common.GetTransaction(TypeTransaction.OK, "");
                    }
                }
                return new CollectionEmpleado(ocol, transaction);
            }
            catch (Exception ex)
            {
                return new CollectionEmpleado(Common.GetTransaction(TypeTransaction.ERR, ex.Message));
            }
        }
        #endregion
    
}
}
