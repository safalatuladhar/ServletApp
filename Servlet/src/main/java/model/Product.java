package model;

import java.math.BigDecimal;
import java.util.Date;

public class Product {
    private Long id;
    private String sku;
    private String name;
    private String description;
    
    private int categoryId;
    private BigDecimal unitPrice;
    private String imageUrl;
    private boolean active;
    private int unitsInStock;




    public Product(Long id, String sku, String name, String description, int categoryId, BigDecimal unitPrice, String imageUrl, boolean active, int unitsInStock) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;

    }

    public Product(Long id, String sku, String name, String description, int categoryId, BigDecimal unitPrice, String imageUrl, boolean active, int unitsInStock, String cateoryName) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;

    }

    public Product(Long id, String name, BigDecimal unitPrice) {
        this.id = id;
        this.name = name;
        this.unitPrice = unitPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getcategoryId() {
        return categoryId;
    }

    public void setcategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActive() {
        return active;
    }


    public void setActive(boolean active) {
        this.active = active;
    }

    public int getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(int unitsInStock) {
        this.unitsInStock = unitsInStock;
    }







    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", sku='" + sku + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", categoryId=" + categoryId +
                ", unitPrice=" + unitPrice +
                ", imageUrl='" + imageUrl + '\'' +
                ", active=" + active +
                ", unitsInStock=" + unitsInStock +
                '}';
    }
}
