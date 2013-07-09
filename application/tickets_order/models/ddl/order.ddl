/********************************
two kind of catalog will save as two order item
Catalog_Line_Occurrence_Flag: 1 occurrence 0  not
Catalog_Line_Occurrence: days interval
Catalog_Line_Date_Expired:99999999 foever
********************************/
CREATE TABLE GP_Catalog (
    Catalog_ID int AUTO_INCREMENT PRIMARY KEY,
    Route_ID int NOT NULL,
    Catalog_Original_Price int NOT NULL,
    Catalog_Current_Price int NOT NULL,
    Catalog_Line_Number varchar(10) NOT NULL,
    Catalog_Line_Company varchar(10) NOT NULL,
    Catalog_Line_Time_Start varchar(4) NOT NULL,
    Catalog_Line_Date_Start DATETIME NOT NULL,
    Catalog_Line_Occurrence_Flag varchar(1) NOT NULL,
    Catalog_Line_Occurrence int NOT NULL,
    Catalog_Line_Date_Expired varchar(8) NOT NULL,
    Catalog_IsRetired varchar(1) NOT NULL,
    Catalog_Name varchar(10) NOT NULL,
    Catalog_Description varchar(100) NOT NULL
) AUTO_INCREMENT=100000;


CREATE TABLE GP_City (
    City_ID int AUTO_INCREMENT PRIMARY KEY,
    City_Name varchar(20) NOT NULL,
    City_Pingyin varchar(20) NOT NULL,
    City_Pingyin_Short varchar(3) NOT NULL,
    City_Country varchar(20) NOT NULL,
    City_Country_Pingyin varchar(20) NOT NULL,
    City_Country_Pingyin_Short varchar(3) NOT NULL
) AUTO_INCREMENT=200000;

/********************************
two kind of catalog will save as two order item
Order_IsPaid: 1 paid 0 pay not
Order_Payment_type: 01 cash 02 net 03 bank
********************************/

CREATE TABLE GP_Order (
    Order_ID int AUTO_INCREMENT PRIMARY KEY,
    Catalog_ID int NOT NULL,
    Order_Quantity int NOT NULL,
    Order_TOT_Price int NOT NULL,
    Customer_ID int NOT NULL,
    Order_Phone varchar(20) NOT NULL,
    Order_Remarks text NOT NULL,
    Order_IsPaid varchar(1) NOT NULL,
    Order_Payment_type varchar(2) NOT NULL,
    Order_IsRetired varchar(1) NOT NULL,
    Order_IsDelivered varchar(1) NOT NULL,
    Order_Create_Time DATETIME NOT NULL,
    Order_Modify_Time DATETIME NOT NULL
) AUTO_INCREMENT=300000;

CREATE TABLE GP_Customer (
    Customer_ID int AUTO_INCREMENT PRIMARY KEY,
    User_ID int ,
    Customer_Name varchar(10) NOT NULL,
    Customer_Phone varchar(20) ,
    Customer_Remarks text 

) AUTO_INCREMENT=400000;

CREATE TABLE GP_Auth_User (
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(30) NOT NULL UNIQUE,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(75) ,
    Phone varchar(20) ,
    password varchar(128) NOT NULL,
    is_staff bool NOT NULL,
    is_cus bool NOT NULL,
    is_active bool NOT NULL,
    is_superuser bool NOT NULL,
    last_login datetime ,
    date_joined datetime 
) AUTO_INCREMENT=500000;

CREATE TABLE GP_route (
    Route_ID int AUTO_INCREMENT PRIMARY KEY,
    Route_Start_City_ID int NOT NULL,
    Route_To_City_ID int NOT NULL
) AUTO_INCREMENT=600000;



