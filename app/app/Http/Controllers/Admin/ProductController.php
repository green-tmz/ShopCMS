<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Controllers\Admin\AdminController;

class ProductController extends AdminController
{
    public function index()
    {
        return response()->json([
            'products' => Product::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create([
            'name' => $request->name,
            'cost' => $request->cost,
            'desc' => $request->desc,
        ]);

        if ($product)
            return response()->json([
                'status' => 'success',
                'message' => 'Товар успешно сохранен'
            ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Ошибка при сохранении товара'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        $product->name = $request->data['name'];
        $product->cost = $request->data['cost'];
        $product->desc = $request->data['desc'];
        $product->foto = $request->data['foto'];

        if ($product->save())
            return response()->json([
                'status' => 'success',
                'message' => 'Товар успешно обновлен'
            ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Ошибка при обновлении товара'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product->delete())
            return response()->json([
                'status' => 'success',
                'message' => 'Товар успешно удален'
            ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Ошибка при удалении товара'
        ]);
    }
}
