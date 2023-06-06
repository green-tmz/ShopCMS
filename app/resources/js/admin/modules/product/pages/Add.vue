<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Добавление товара</h1>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-primary">
                            <!-- <div class="card-header">
                                <h3 class="card-title">Quick Example</h3>
                            </div> -->
                            <div  v-if="Object.keys(validationErrors).length > 0">
                                <div>
                                    <ul>
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <form>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">Название товара*</label>
                                        <input type="text" class="form-control" v-model="product.name" id="name" placeholder="Название товара">
                                    </div>

                                    <div class="form-group">
                                        <label for="cost">Цена товара*</label>
                                        <input type="number" step="0.01" class="form-control" v-model="product.cost" id="cost" placeholder="Цена товара">
                                    </div>

                                    <div class="form-group">
                                        <label for="cost">Описание товара*</label>
                                        <ckeditor :editor="editor" v-model="product.desc" :config="editorConfig"></ckeditor>
                                    </div>

                                    <div class="form-group">
                                        <label for="foto">Фото товара</label>
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="foto">
                                                <label class="custom-file-label" for="foto">Выберите файл</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <button type="submit" style="margin-right: 10px;" class="btn btn-sm btn-primary" @click.stop.prevent="submit()">Сохранить</button>
                                    <a href="/admin/products" class="btn btn-sm btn-success">Назад</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: 'products-add',
    data() {
        return {
            product: {
                name: '',
                cost: '',
                desc: '',
            },
            validationErrors:{},
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the editor.
            }
        }
    },
    mounted() {

    },
    methods: {
        submit() {
            axios.post('/api/admin/products', this.product).then(({data})=>{
                if(data.status == 'success'){
                    this.validationErrors = {}
                    location.href = '/admin/products';
                }
            }).catch(({response})=>{
                if(response.status === 422){
                    this.validationErrors = response.data.errors
                }
            })
        }
    }
}
</script>
