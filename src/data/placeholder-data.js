const users= [
    {
        id:'410544b2-4001-4271-9855-fec4b6a6442a',
        email: 'user01@knowledge.com',
        name: 'Paul Norton',
        password: 'user01',
        role: 'viewer'
    },
    {
        id:'410544c2-4001-4271-9855-fec4b6a6442a',
        email: 'editor01@knowledge.com',
        name: 'Antonio Santos',
        password: 'editor01',
        role: 'editor'
    },
    {
        id:'d7a66f1b-2b51-4ab8-9522-6778f3d2564d',
        email: 'editor02@knowledge.com',
        name: 'Lizeth Rios',
        password: 'editor02',
        role: 'editor'
    }
];
const categories=[
    {
        id:'b7b2ca15-597d-4b35-8027-a619c8cdea24',
        category:'System Error',
        description:'System or web application bugs'
    },
    {
        id:'f8557e0b-345e-4329-b713-a904fc210aaf',
        category:'Functionality',
        description:'Problems with lack of functionalities that the web application currently does not have'
    },
    {
        id:'dacf4539-a912-4885-9376-f93eb72ba34d',
        category:'Database Error',
        description:'Problems with the database that do not allow reading or saving records'
    }
]
const problems=[
    {
        id:'2b19de5a-d1eb-4de8-84f4-dcf46e8f3c35',
        problem: 'Registration error Code:E0015',
        solution: 'Clear the browser cache and try to register from another internet browser.',
        category_id :'b7b2ca15-597d-4b35-8027-a619c8cdea24'
    },
    {
        id:'a6aca7c8-ea35-4877-96b2-aba3519ba3e2',
        problem: 'Sending notification error Code:E0041',
        solution: 'The email has been sent but there is no confirmation, it is probably because it is in the SPAM tray, ask the user to check their tray.',
        category_id :'b7b2ca15-597d-4b35-8027-a619c8cdea24'
    },
    {
        id:'b8cafcff-6dac-43d1-8c87-b77d2d851bde',
        problem: 'I cannot check the details of who sent the notification',
        solution: 'It is a lack of functionality in the application and we are working on implementing it in the next deployment to production. We can manually send the information by accessing the Notifications table database.',
        category_id :'f8557e0b-345e-4329-b713-a904fc210aaf'
    },
    {
        id:'0c977825-ca92-4142-be53-ace849485f35',
        problem: 'I cannot view the pdf of the report',
        solution: 'The database record probably has special characters. You must enter the Reports table and delete the special characters in every column',
        category_id :'dacf4539-a912-4885-9376-f93eb72ba34d'
    },
    {
        id:'ef23e1c2-7ff7-47fc-a801-7713f974832a',
        problem: 'Statistical reports take a long time to load',
        solution: 'It is due to the current version of the database that cannot work with more than 1 million records, adjustments are being made to migrate to a next version, for now the reports can be generated manually.',
        category_id :'dacf4539-a912-4885-9376-f93eb72ba34d'
    }
]

module.exports = {
    users,
    categories,
    problems
  };
  