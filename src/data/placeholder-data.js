const users= [
    {
        email: 'user01@knowledge.com',
        fullname: 'Paul Norton',
        password: 'user01',
        role: 'viewer'
    },
    {
        email: 'editor01@knowledge.com',
        fullname: 'Antonio Santos',
        password: 'editor01',
        role: 'editor'
    },
    {
        email: 'editor02@knowledge.com',
        fullname: 'Lizeth Rios',
        password: 'editor02',
        role: 'editor'
    }
];
const categories=[
    {
        category:'System Error',
        description:'System or web application bugs'
    },
    {
        category:'Functionality',
        description:'Problems with lack of functionalities that the web application currently does not have'
    },
    {
        category:'Database Error',
        description:'Problems with the database that do not allow reading or saving records'
    }
]
const problems=[
    {
        problem: 'Registration error Code:E0015',
        solution: 'Clear the browser cache and try to register from another internet browser.',
        category_id :1
    },
    {
        problem: 'Sending notification error Code:E0041',
        solution: 'The email has been sent but there is no confirmation, it is probably because it is in the SPAM tray, ask the user to check their tray.',
        category_id :1
    },
    {
        problem: 'I cannot check the details of who sent the notification',
        solution: 'It is a lack of functionality in the application and we are working on implementing it in the next deployment to production. We can manually send the information by accessing the Notifications table database.',
        category_id :2
    },
    {
        problem: 'I cannot view the pdf of the report',
        solution: 'The database record probably has special characters. You must enter the Reports table and delete the special characters in every column',
        category_id :3
    },
    ,
    {
        problem: 'Statistical reports take a long time to load',
        solution: 'It is due to the current version of the database that cannot work with more than 1 million records, adjustments are being made to migrate to a next version, for now the reports can be generated manually.',
        category_id :3
    }
]