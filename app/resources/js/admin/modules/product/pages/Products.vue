<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Товары</h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <a href="/admin/products/add" class="btn btn-sm btn-primary">Добавить</a>
        <table id="mi-tabla" class="table" style="margin-top: 20px;">
            <thead>
                <tr class="encabezado-derecha">
                    <th @click='sort("id")'>{{ sortBy === 'id' ? '*' : '' }}№</th>
                    <th @click='sort("foto")'>{{ sortBy === 'foto' ? '*' : '' }}Фото</th>
                    <th @click='sort("name")'>{{ sortBy === 'name' ? '*' : '' }}Название</th>
                    <th @click='sort("cost")'>{{ sortBy === 'cost' ? '*' : '' }}Цена</th>
                    <th @click='sort("desc")'>{{ sortBy === 'desc' ? '*' : '' }}Описание</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody v-if="sortedList.length > 0">
                <tr class="item" v-for="(product, n) in sortedList">
                    <td>{{n+1}}</td>
                    <td>{{product.foto}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.cost}}</td>
                    <td><p v-html="product.desc"></p></td>
                    <td>
                        <a :href="'/admin/products/'+product.id" class="btn btn-sm btn-primary" style="margin-right: 10px;">
                            <i class="fas fa-edit"></i>
                        </a>
                        <button @click="del(product.id)" class="btn btn-sm btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr class="item">
                    <td colspan="5" style="text-align: center;">Товары не найдены</td>
                </tr>
            </tbody>
        </table>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  name: 'products',
  data() {
    return {
        products: [],
        sortBy: "name",
        sortOrder: 1,
    }
  },
  computed: {
    sortedList() {
        if (this.products.length > 0) {
            return [...this.products]
                .map(i => ({...i, cost:parseFloat(i.cost)}))
                .sort((a,b) => {
                if (a[this.sortBy] >= b[this.sortBy]) {
                    return this.sortOrder
                }
                return -this.sortOrder
            })
        }

        return []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
        axios.get('/api/admin/products').then(({data})=>{
            this.products = data.products
        })
    },
    sort(sortBy) {
    	if(this.sortBy === sortBy) {
            this.sortOrder = -this.sortOrder;
        } else {
            this.sortBy = sortBy
        }
    },
    del(id) {
        if (confirm("Удалить товар?")) {
            axios.post('/api/admin/products/'+id, {_method: 'delete'}).then(({data})=>{
                if(data.status == 'success'){
                    alert(data.message)
                    this.getProducts()
                }
            })
        }
    }
  }
}
</script>
