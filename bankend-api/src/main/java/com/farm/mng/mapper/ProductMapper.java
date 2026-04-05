package com.farm.mng.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.farm.mng.entity.Product;
import org.apache.ibatis.annotations.Mapper;

/**
 * 商品Mapper
 */
@Mapper
public interface ProductMapper extends BaseMapper<Product> {
}