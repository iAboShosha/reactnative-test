const config = {
    baseUrl: "http://192.168.1.4:3000/api",
    baseSocketUrl: "http://192.168.1.4:3000",
    apiKey: "AIzaSyAv_UyY7prHI1dVpPIaj3B1O-7ktU-vPEE"
};

const font = {fontFamily: 'Cairo-Regular', fontFamilyBold: 'Cairo-Bold'};

const colors = {
    background: '#fff',
    primary: '#2E2E2E',
    gradient_1: '#0ac4ba',
    gradient_2: '#2bda8e',
    primary_font: '#000000',
    secondary_font: '#88889c',
    error: '#f3534a',
    shadow: '#D4D6D7',
    notification: '#ff4757',
    gradient_urgent_1: '#f35119',
    gradient_urgent_2: '#ff3fb4',
    forget: '#5679bf',
    border: '#f0f2f3',
    borderColor:'#E6E6E6',
};
const colorsDropdown = [
    {label: 'ALL', value: -1},
    {label: 'White', value: 'White'},
    {label: 'Black', value: 'Black'},
    {label: 'Red', value: 'Red'},
    {label: 'Green', value: 'Green'},
    {label: 'DarkBlue', value: 'DarkBlue'},
    {label: 'Gray', value: 'Gray'},
    {label: 'Orange', value: 'Orange'},
    {label: 'Yellow', value: 'Yellow'},
    {label: 'Pink', value: 'Pink'},
    {label: 'Purple', value: 'Purple'},
    {label: 'Blue', value: 'Blue'}
];

const userTypes = {
    admin: 'مسئول',
    donor: 'متبرع',
    volunteer: 'متطوع'
};

const caseStatuses = {
    "started": "بدأت",
    "reopened": "معادة",
    "rejected": "مرفوضة",
    "assigned": "معينة",
    "added": "مضافة",
    "completed": "مكتملة",
    "in-progress": "في تقدم",
    "accepted": "مقبولة",
    "reported": "تم الزيارة المنزلية"
};

const categoryTypes = {
    "money": "نقدي",
    "corporeal": "عيني"
};

export {config, colors, userTypes, caseStatuses, categoryTypes, font, colorsDropdown}

