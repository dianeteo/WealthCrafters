# WealthCrafters
Milestone 1 Submission

Team Name: 

WealthCrafters

Proposed Level of Achievement: 

Apollo 11 

Motivation: 
As tertiary students, we understand the importance of making sound financial decisions for future financial security. Especially in a climate where investing has become commonplace due to increased accessibility enabled by online brokerage platforms, there are many incidents in which individuals jump into making reckless investment decisions, leading to financial troubles that could have been easily avoided through consolidated financial planning. Hence, we want to promote an environment where individuals strive for good financial health, along with maintaining a healthy portfolio as we believe that making sound investment decisions can lead to better financial health. 

On the other hand, for individuals who are new to the idea of investing or managing personal finance, one might feel overwhelmed by the sea of information that is available online and hence might be apprehensive to start planning out their own finances. We want to help them through facilitating their search for accurate information and clear any doubts or misconceptions for them to make more sound financial decisions.

Aim:
We want to help individuals make sound financial decisions through a one-stop application that assists one’s financial planning, increases one’s financial literacy and facilitates portfolio management.

Tech Stack:
JavaScript: The language used to code our application
React Native: The framework adopted to code our application
PlanetScale: MySQL cloud database for storage of user inputs and management of real-time data for our stock market simulator

User Stories:

As a…
I want to…
So that I can…
Pre-tertiary student/University student/Working adult
log in with a unique user ID and password
be able to keep track of my expenses across different devices
Pre-tertiary student/University student/Working adult
navigate between different interfaces of the application (financial planner, financial literacy, portfolio management)
be able to conveniently access the different functions of the application
Pre-tertiary student/University student/Working adult
visualise my monthly expenses and savings in the form of a calendar
better visualise my expenses for the month
Pre-tertiary student/University student/Working adult
input my daily expenses
keep track of my expenses
Pre-tertiary student/University student/Working adult
create different categories for my daily expenses
track my daily expenses more closely
Pre-tertiary student/University student/Working adult
input my monthly earnings/income
keep track of my monthly earnings/income
Pre-tertiary student/University student/Working adult
calculate my daily and monthly savings
keep track of my monthly savings
Pre-tertiary student/University student/Working adult
visualise my expenses according to categories I create
gain insights on my monthly expenditure
Pre-tertiary student/University student/Working adult
visualise my savings on a regular interval
to track how my expenditure has changed across different months/as compared to the past year
Pre-tertiary student/University student/Working adult
visualise my savings through different diagrams
have an easier time gaining insights on my monthly expenditure
Pre-tertiary student/University student/Working adult
calculate how much I need to save to reach my target 
plan my finances accordingly
Pre-tertiary student/University student/Working adult
know whether I exceeded my allowed expense for the day
plan my future finances accordingly to reach my financial goal
University student/working adult
understand my queries on any financial information I require despite improper phrasing
kickstart my investment journey
University student/working adult
seek credibility on the sources I search for my financial information
not be scammed by fake financial gurus that have been gaining credibility rapidly on the Internet recently
University student/working adult
be able to access an integrated platform where there is live stock market data and there is a credible source of information
have a one-stop solution to improve my financial literacy
University student/working adult
get acquainted with investment fundamentals through an investment simulator
better understand market behaviour before making real life investment decisions


Software Engineering Practices:
ER Diagram


We have identified 3 tables to be created in our database, namely users, expenses and income. Users have the same relationship with expenses as they do with income; each expense and income created belong to one and only one user while each user is able to create zero or many expenses and income entries.

We foresee that there will be derived attributes that can be dynamically calculated by SQL queries such as total expenses and total income for monthly and yearly statistics.


Features:
There are 3 key features to this financial helper app, of which it can be accessed through a main menu:

Financial Planner

Users will input their expenses, savings, income and assets into our application and our application will return the balance, along with calculated key statistics like an individual’s average spending/savings per day, and how much they need to save further to hit a certain savings amount etc. Through all of this, they are painted with a much clearer picture on their current financial situation. 


Users will input their income (active income, portfolio income, passive income) and their daily expenses and respective income and expense data will be stored into the application’s database both locally and on in the cloud.
This is visualised using a calendar interface (Figure 1).



Figure 1: Calendar interface of our application to help users better visualise their daily total balance

Figure 1b: Bottom Tab that shows how to access entry page

They will be able to then access the Entry Page through the Bottom Tab Navigator. (Figure 1b)
They will then be able to input the date, category and amount after clicking on the submit button. (Figure 1b)

For the convenience of the user to access their data across different devices, expense and income data can be identified by a key which is the user’s unique ID (Figure 2). The login feature will be implemented in Milestone 2.






Figure 2: Users, expenses and income tables with their relevant attributes

User input for their expense will be done through a calculator. As of Milestone 1, the output is shown in the box above. However, for future Milestones, this output will be reflected under a page that allows users to input an individual entry that will be shown in the logs. This calculator can perform simple addition and subtraction arithmetic operations, of which the entire numerical statement will be showcased in the output box before evaluated. The evaluation is then rounded off to 2 decimal places, as money is dealt in 2 decimal places. 
 





Figure 2: Calculator that returns daily total balance


(To be Done by the 2nd week of June!)
Calculator will return the user’s total monthly savings with the option of viewing the user’s total yearly savings.
Users can also create different expenditure categories (eg. food/transport/gadgets/clothes & users can create their own custom categories with default emojis) to track their expenditure more closely. 
Daily expenses and total monthly balance will be reflected in a calendar for ease of interpretation (this will be the main interface)
User dashboard will reflect key statistics such as:
User’s average daily/monthly expenditure (split into categories that user has created) [pie chart];
Monthly savings;
Monthly income (split into active income, portfolio income, passive income) [pie chart];
Expenditures are compared based on:
(1) Composition of expenditure:
By month (12 stacked bars)
By year (2 pie charts)
(2) Total expenditure:
By month (12 bars)
By year (2 bars) 
User can also input their target balance for each month to hit a certain target savings across an extended time period (1 year/3 years/5 years) and the user dashboard will reflect how much more the user has to save to reach target balance.


Financial Literacy (To be done by the 4th Week of June)

For users who have already been exposed to the concept of investing, they will be able to converse with a chatbot who will generate answers specially curated to their respective inputs, something similar to ChatGPT. This chatbot can compile information too, if need be, from credible sources for the user. 

For users who are new to the concept of investing, they can seek guidance from the chatbot to kickstart their investment journey. 


Get the API to work (for every input, there exists an output)
Check that (1) leading questions and (2) invalid inputs are given suitable answers (for example, a default answer that the question cannot be answered).
Tailor output such that it answers the input accurately.


Portfolio Management (To be done by 2nd week of July)

This section will display real-time data of current stock prices. Users can allocate part of their assets (set aside cash) from their financial planner to visualise how they can grow their money through different portfolios that they can customize. With target prices set, should the price of the stock reach that target price, they can get notified to buy that certain stock from their respective brokerage platforms. 

A simulator feature will be provided as well to show their “what-if” earnings should they have invested in a certain basket of financial instruments. Users will have the option of incorporating these earnings into their financial planner.


Users will be able to set a target buy price for stocks that they have an interest in, and target sell price for stocks they wish to sell. 
Live stock market database will be fed to our application.	
Once stock prices reach the user's target price, users will be prompted with a notification to make the stock purchase. 
Users will also have access to a simulator to show their “what-if” earnings should they have invested in a certain basket of financial instruments. 
This caters to both beginner investors (to train their eye on the market) and seasoned investors (for them to see how a certain stock might behave).
This simulator follows prices that are shown in a live stock market. 
Reflects on their “supposed” returns correctly.



Timeline:
Timeline of Completion:
Learn about different technologies & languages required - end April to mid May

Financial Planner 
Create database + connection (Completed)
Create login interface (by 1st week of June)
Automate data creation process for these touchables:
Input expenses (hopefully can complete by today lol)
Input income (by 1st week of June)
Create SQL queries for derived attributes (by 2nd week of June):
Total expenses & income (monthly, yearly) 

Financial Literacy - end June
Importing the API(2nd week of June)
Tuning the API to provide suitable answers for leading questions and invalid output (3rd week of June)
Improving the accuracy of the answers towards any input (4th week of June)

Portfolio Management - mid July
Importing live stock market databases (1st week of July)
Being able to input buy and sell prices (1st week of July)
Calculation of hypothetical returns/losses (2nd week of July)
Bringing together the whole concept of the simulator (2nd-3rd week of July)


