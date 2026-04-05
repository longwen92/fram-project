package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.Product;
import com.farm.mng.mapper.ProductMapper;
import com.farm.mng.service.IProductService;
import org.springframework.stereotype.Service;

/**
 * 商品服务实现
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements IProductService {
}