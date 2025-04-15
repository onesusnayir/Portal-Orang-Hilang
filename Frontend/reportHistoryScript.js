const missingPersonList = document.getElementById('missing-person-list');
const foundPersonList = document.getElementById('found-person-list');
const missingPersonReportList = document.getElementById('report-missing-person-list');
const foundPersonClaimList = document.getElementById('claim-found-person-list');

const missingPersonListBtn = document.getElementById('missing-person-list-btn');
const foundPersonListBtn = document.getElementById('found-person-list-btn');
const missingPersonReportListBtn = document.getElementById('report-missing-list-form-btn');
const foundPersonClaimListBtn = document.getElementById('claim-found-person-list-btn');

document.addEventListener('DOMContentLoaded', async function () {
    try{
        missingPersonList.classList.remove('hidden');
        foundPersonList.classList.add('hidden');
        missingPersonReportList.classList.add('hidden');
        foundPersonClaimList.classList.add('hidden');
        
        missingPersonListBtn.classList.add('sidebar-btn-active');
        foundPersonListBtn.classList.remove('sidebar-btn-active');
        missingPersonReportListBtn.classList.remove('sidebar-btn-active');
        foundPersonClaimListBtn.classList.remove('sidebar-btn-active');

        const tbody = document.getElementById("missing-person-table").getElementsByTagName("tbody")[0];
    
        const missingPersonResult = await axios.get('http://localhost:3000/missing-persons',  {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = missingPersonResult.data;

        // kalo belum ada data di found user
        if (data.message) {
            console.log(data.message);
            return;
        }

        const messageText = document.createElement('p');

        messageText.textContent = data.message;
        missingPersonList.appendChild(messageText);
        
        data.forEach((item) => {
            // new row
            const newRow = document.createElement("tr");

            // Full Name
            const full_name = document.createElement("td");
            full_name.textContent = item.full_name;  

            // Age
            const created_at = document.createElement("td");
            created_at.textContent = item.created_at.split('T')[0];  

            // Status
            const status = document.createElement("td");
            status.textContent = item.status;  

            const buttonCells = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "See Details";
            button.classList.add("btn-reset");
            buttonCells.appendChild(button);

            newRow.appendChild(full_name);
            newRow.appendChild(status);
            newRow.appendChild(created_at);
            newRow.appendChild(buttonCells);

            tbody.appendChild(newRow);
        })

        console.log(missingPersonResult.data);
    }catch(error){
        if (error.response) {
            console.error('Server responded with an error:');
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
            alert(`Error ${error.response.status}: ${error.response.data.error || 'Terjadi kesalahan pada server.'}`);
          } else if (error.request) {
            console.error('No response received from server.');
            console.error(error.request);
            alert('Tidak ada respon dari server. Pastikan server berjalan.');
          } else {
            console.error('Error setting up request:', error.message);
            alert(`Request error: ${error.message}`);
          }
    }
});

missingPersonListBtn.addEventListener('click', function () {
    missingPersonList.classList.remove('hidden');
    foundPersonList.classList.add('hidden');
    missingPersonReportList.classList.add('hidden');
    foundPersonClaimList.classList.add('hidden');

    missingPersonListBtn.classList.add('sidebar-btn-active');
    foundPersonListBtn.classList.remove('sidebar-btn-active');
    missingPersonReportListBtn.classList.remove('sidebar-btn-active');
    foundPersonClaimListBtn.classList.remove('sidebar-btn-active');
});

foundPersonListBtn.addEventListener('click', function () {
    foundPersonList.classList.remove('hidden');
    missingPersonList.classList.add('hidden');
    missingPersonReportList.classList.add('hidden');
    foundPersonClaimList.classList.add('hidden');

    foundPersonListBtn.classList.add('sidebar-btn-active');
    missingPersonListBtn.classList.remove('sidebar-btn-active');
    missingPersonReportListBtn.classList.remove('sidebar-btn-active');
    foundPersonClaimListBtn.classList.remove('sidebar-btn-active');

    foundPerson();
});

missingPersonReportListBtn.addEventListener('click', function () {
    missingPersonReportList.classList.remove('hidden');
    foundPersonClaimList.classList.add('hidden');
    missingPersonList.classList.add('hidden');
    foundPersonList.classList.add('hidden');

    missingPersonReportListBtn.classList.add('sidebar-btn-active');
    foundPersonClaimListBtn.classList.remove('sidebar-btn-active');
    missingPersonListBtn.classList.remove('sidebar-btn-active');
    foundPersonListBtn.classList.remove('sidebar-btn-active');
});

foundPersonClaimListBtn.addEventListener('click', function () {
    foundPersonClaimList.classList.remove('hidden');
    missingPersonReportList.classList.add('hidden');
    missingPersonList.classList.add('hidden');
    foundPersonList.classList.add('hidden');

    foundPersonClaimListBtn.classList.add('sidebar-btn-active');
    missingPersonReportListBtn.classList.remove('sidebar-btn-active');
    missingPersonListBtn.classList.remove('sidebar-btn-active');
    foundPersonListBtn.classList.remove('sidebar-btn-active');
});

async function missingPerson() {
    try{
        const tbody = document.getElementById("found-person-table").getElementsByTagName("tbody")[0];
    
        const foundPersonResult = await axios.get('http://localhost:3000/found-persons',  {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = foundPersonResult.data;

        // kalo belum ada data di found user
        if (data.message) {
            console.log(data.message);
            return;
        }

        const messageText = document.createElement('p');

        messageText.textContent = data.message;
        missingPersonList.appendChild(messageText);
        
        data.forEach((item) => {
            // new row
            const newRow = document.createElement("tr");

            // Full Name
            const found_location = document.createElement("td");
            found_location.textContent = item.found_location;  

            // Status
            const status = document.createElement("td");
            status.textContent = item.status;  
            
            // Age
            const created_at = document.createElement("td");
            created_at.textContent = item.created_at.split('T')[0];  

            const buttonCells = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "See Details";
            button.classList.add("btn-reset");
            buttonCells.appendChild(button);

            newRow.appendChild(found_location);
            newRow.appendChild(status);
            newRow.appendChild(created_at);
            newRow.appendChild(buttonCells);

            tbody.appendChild(newRow);
        })

        console.log(missingPersonResult.data);
    }catch(error){
        if (error.response) {
            console.error('Server responded with an error:');
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
            alert(`Error ${error.response.status}: ${error.response.data.error || 'Terjadi kesalahan pada server.'}`);
          } else if (error.request) {
            console.error('No response received from server.');
            console.error(error.request);
            alert('Tidak ada respon dari server. Pastikan server berjalan.');
          } else {
            console.error('Error setting up request:', error.message);
            alert(`Request error: ${error.message}`);
          }
    }
}

async function foundPerson(){
    try{
        missingPersonList.classList.add('hidden');
        foundPersonList.classList.remove('hidden');
        missingPersonReportList.classList.add('hidden');
        foundPersonClaimList.classList.add('hidden');
        
        missingPersonListBtn.classList.add('sidebar-btn-active');
        foundPersonListBtn.classList.remove('sidebar-btn-active');
        missingPersonReportListBtn.classList.remove('sidebar-btn-active');
        foundPersonClaimListBtn.classList.remove('sidebar-btn-active');

        const tbody = document.getElementById("missing-person-table").getElementsByTagName("tbody")[0];
    
        const missingPersonResult = await axios.get('http://localhost:3000/missing-persons',  {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = missingPersonResult.data;

        // kalo belum ada data di found user
        if (data.message) {
            console.log(data.message);
        }

        const messageText = document.createElement('p');

        messageText.textContent = data.message;
        missingPersonList.appendChild(messageText);
        
        data.forEach((item, index) => {
            // new row
            const newRow = document.createElement("tr");

            // Full Name
            const full_name = document.createElement("td");
            full_name.textContent = item.full_name;  

            // Age
            const created_at = document.createElement("td");
            created_at.textContent = item.created_at.split('T')[0];  

            // Status
            const status = document.createElement("td");
            status.textContent = item.status;  

            const buttonCells = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "See Details";
            button.classList.add("btn-reset");
            buttonCells.appendChild(button);

            newRow.appendChild(full_name);
            newRow.appendChild(status);
            newRow.appendChild(created_at);
            newRow.appendChild(buttonCells);

            tbody.appendChild(newRow);
        })

        console.log(missingPersonResult.data);
    }catch(error){
        if (error.response) {
            console.error('Server responded with an error:');
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
            alert(`Error ${error.response.status}: ${error.response.data.error || 'Terjadi kesalahan pada server.'}`);
          } else if (error.request) {
            console.error('No response received from server.');
            console.error(error.request);
            alert('Tidak ada respon dari server. Pastikan server berjalan.');
          } else {
            console.error('Error setting up request:', error.message);
            alert(`Request error: ${error.message}`);
          }
    }
}