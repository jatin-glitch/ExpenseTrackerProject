public class Expense {
    private String date;
    private String category;
    private double amount;
    private String description;

    public Expense(String date , String category , Double amount ,  String description){
        this.date = date;
        this.category = category;
        this.amount = amount;
        this.description = description;
    }
    public String getDate(){
        return date;
    }
    public String getCategory(){
        return category;
    }
    public double getAmount(){
        return amount;
    }
    public String getDescription(){
        return description;
    }
    @Override
    public String toString() {
        return date + " | " + category + " | " + amount + " | " + description;
    }
}

