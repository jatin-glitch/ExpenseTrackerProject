import java.util.*;
import java.io.*;

public class ExpenseTracker {
    static ArrayList<Expense> expenses = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int choice;
        do{
            System.out.println("\n(Expense tracker menu)");
            System.out.println("1 : Add Expense ");
            System.out.println("2 : View Expense");
            System.out.println("3 : View Summary By Category");
            System.out.println("4 : Save Expenses to file ");
            System.out.println("5 : Load Expenses To file");
            System.out.println("6 : Exit");

            System.out.print("Choose Options From 1 to 6 : ");

            while (!sc.hasNextInt()) {
                System.out.print("Please enter a number: ");
                sc.next();
            }
            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

            case 1 -> addExpenses();
            case 2 -> viewExpenses();
            case 3 -> viewSummary();
            case 4 -> saveToFile();
            case 5 -> loadFromFile();
            case 6 -> System.out.println("Exiting ... GoodBye ");
            default -> System.out.println("Invalid Operator ");
            }
        }while (choice != 6);
    }

    public static void addExpenses(){
        System.out.print("Enter date (YYYY-MM-DD): ");
        String date = sc.nextLine().trim();

        System.out.print("Enter category: ");
        String category = sc.nextLine().trim();
        System.out.print("Enter Amount : ");
        double amount;
        while (true){
            try {
                amount = Double.parseDouble(sc.nextLine().trim());
                if (amount < 0) {
                    System.out.println("enter a Positive number ");
                    continue;
                }
                break;
            }catch (NumberFormatException e ){
                System.out.println("invalid amount ");
            }
        }
        System.out.print("Enter Description: ");
        String description = sc.nextLine().trim();

        Expense e = new Expense(date, category, amount , description);
        expenses.add(e);
        System.out.println("Expense added; ");
    }
    public static void viewExpenses(){
        if (expenses.isEmpty()) {
            System.out.println("No Expenses to show ");
        }else {
            System.out.println("All Expenses ");
            for (Expense e  : expenses){
                System.out.println(e);
            }
        }
    }

    public static void viewSummary(){
        if (expenses.isEmpty()){
            System.out.println("no expenses to Summarize ");
            return;
        }

        HashMap<String , Double> summary = new HashMap<>();
        for (Expense e : expenses){
            String cat = e.getCategory();
            double amt = e.getAmount();
            summary.put(cat, summary.getOrDefault(cat, 0.0) + amt);
        }
        System.out.println("Summary By Category : ");
        for (String cat :  summary.keySet()){
            System.out.printf("%s: %2f/n" , cat ,summary.get(cat));
        }
    }
    public static void saveToFile(){
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("expenses.txt"))) {
            for (Expense e : expenses) {
                String line = e.getDate() + "," + e.getCategory() + "," + e.getAmount() + "," + e.getDescription();
                writer.write(line);
                writer.newLine();
            }
            System.out.println(" Expenses saved to file.");
        } catch (IOException e) {
            System.out.println(" Error saving to file: " + e.getMessage());
        }
    }
    public static void loadFromFile(){
        expenses.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader("expenses.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",", 4);
                if (parts.length == 4) {
                    String date = parts[0];
                    String category = parts[1];
                    double amount = Double.parseDouble(parts[2]);
                    String description = parts[3];

                    Expense e = new Expense(date, category, amount, description);
                    expenses.add(e);
                }
            }
            System.out.println("Expenses loaded from file.");
        } catch (IOException e) {
            System.out.println("Error loading from file: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format in file.");
        }
    }
}
