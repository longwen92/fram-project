package com.farm.mng.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.farm.mng.entity.ProductCategory;
import org.apache.ibatis.annotations.Mapper;

/**
 * 商品分类Mapper
 */
@Mapper
public interface ProductCategoryMapper extends BaseMapper<ProductCategory> {
}