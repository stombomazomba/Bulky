using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Bulky.DataAccess.Data;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Models;

namespace Bulky.DataAccess.Repository.IRepository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private ApplicationDbContext _db;

        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Product obj)
        {
            //_db.Products.Update(obj);
            var productFromDb = _db.Products.FirstOrDefault(p => p.Id == obj.Id);
            if (productFromDb != null)
            {
                productFromDb.Title = obj.Title;
                productFromDb.ISBN = obj.ISBN;
                productFromDb.Description = obj.Description;
                productFromDb.Author = obj.Author;
                productFromDb.ListPrice = obj.ListPrice;
                productFromDb.Price = obj.Price;
                productFromDb.Price50 = obj.Price50;
                productFromDb.Price100 = obj.Price100;
                productFromDb.CategoryId = obj.CategoryId;
              if (obj.ImageUrl != null)
                {
                    productFromDb.ImageUrl = obj.ImageUrl;
                }
            }
        }
    }
}
