package com.farm.mng;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.farm.mng.mapper")
@ComponentScan(basePackages = {"com.farm.mng", "com.farm.common"})
public class BankendApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankendApiApplication.class, args);
    }

}