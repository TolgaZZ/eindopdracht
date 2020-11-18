$(document).ready(function () {
    $.ajax({
        url: 'php/uitlees.php',
        success: function (response) {
            let members = JSON.parse(response);
            members.forEach(function (item) {
                $('#members tbody').append(`<tr>
                                                <th scope="row">${item['id']}</th>
                                                <td>${item['first_name']}</td>
                                                <td>${item['last_name']}</td>
                                                <td>${item['gender']}</td>
                                                <td>${item['birth_date']}</td>
                                                <td>${item['member_since']}</td>
                                                <td><button class="btn btn-primary delete" data-toggle="modal" data-target="#modal">Delete</button></td>
                                                <td><button class="btn btn-primary edit" data-toggle="modal" data-target="#modal">Edit</button></td>
                                            </tr>`);
            });
        }
    });

    $(document).on('click', '.delete', function () {
        let html = this.parentElement.parentElement;
        let id = $(html).find('th')[0].innerHTML;
        let firstName = $(html).find('td')[0].innerHTML;
        $('.modal-title').html('Lid verwijderen');
        $('.modal-body').html(`ID: ${id}<br>Voornaam: ${firstName}<input type="hidden" value="${id}" name="id" id="id">`);
        $('#btn-action').html(`Verwijder ${firstName}`);
    });

    $(document).on('click', '.edit', function () {
        let html = this.parentElement.parentElement;
        let id = $(html).find('th')[0].innerHTML;
        let firstName = $(html).find('td')[0].innerHTML;
        let lastName = $(html).find('td')[1].innerHTML;
        let gender = $(html).find('td')[2].innerHTML;
        let birthDate = $(html).find('td')[3].innerHTML;
        $('.modal-title').html('Lid bewerken');
        $('.modal-body').html(`<div class="form-group">
                                    <label for="voornaam">Voornaam</label>
                                    <input type="text" class="form-control" id="voornaam" value="${firstName}" required>
                                </div>
                                <div class="form-group">
                                    <label for="achternaam">Achternaam</label>
                                    <input type="text" class="form-control" id="achternaam" value="${lastName}" required>
                                </div>
                                <div class="form-group">
                                    <label for="gender">Gender</label><br>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="female" value="F"${gender == "F" ? " checked" : ""}>
                                        <label class="form-check-label" for="female">Female</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="male" value="M"${gender == "M" ? " checked" : ""}>
                                        <label class="form-check-label" for="male">Male</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="birth-date">Geboortedatum</label>
                                    <input type="date" class="form-control" id="birth-date" value="${birthDate}" required>
                                    <input type="hidden" value="${id}" name="id" id="id">
                                </div>`);
        $('#btn-action').html(`Verander ${firstName}`);
    });

    $(document).on('click', '.add', () => {
        $('.modal-title').html('Lid toevoegen');
        $('.modal-body').html(`<div class="form-group">
                                    <label for="voornaam">Voornaam</label>
                                    <input type="text" class="form-control" id="voornaam" placeholder="Voornaam" required>
                                </div>
                                <div class="form-group">
                                    <label for="achternaam">Achternaam</label>
                                    <input type="text" class="form-control" id="achternaam" placeholder="Achternaam" required>
                                </div>
                                <div class="form-group">
                                    <label for="gender">Gender</label><br>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="female" value="F" checked>
                                        <label class="form-check-label" for="female">Female</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="male" value="M">
                                        <label class="form-check-label" for="male">Male</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="birth-date">Geboortedatum</label>
                                    <input type="date" class="form-control" id="birth-date" required>
                                </div>`);
        $('#btn-action').html(`Voeg lid toe`);
    });

    $(document).on('click', '#btn-action', function () {
        let html = $(this)[0].innerHTML;
        let id = $("#id").val();
        if (html.startsWith('Verwijder')) {
            var url = 'php/verwijder.php';
            var data = {
                id: id
            }
        } else if (html.startsWith('Edit') || html.startsWith('Voeg')) {
            let firstName = $("#voornaam").val();
            let lastName = $("#achternaam").val();
            let gender = $("input[name='gender']:checked").val();
            let birthDate = $("#birth-date").val();
            var url = html.startsWith('Edit') ? "php/verander.php" : "php/toevoeg.php"; 
            var data = {
                id: id,
                first_name: firstName,
                last_name: lastName,
                gender: gender,
                birth_date: birthDate
            }
        }

        let row = $('th').filter(function(){
            return $(this).text() === id
        });

        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: (response) => {
                if (html.startsWith('Verwijder')) {
                    row[0].parentElement.remove();
                } else if (html.startsWith('Edit')) {
                    let html = row[0].parentElement;
                    $(html).find('td')[0].innerHTML = data.first_name;
                    $(html).find('td')[1].innerHTML = data.last_name;
                    $(html).find('td')[2].innerHTML = data.gender;
                    $(html).find('td')[3].innerHTML = data.birth_date;
                } else {
                    let member = JSON.parse(response);
                    $('#members tbody').prepend(`<tr>
                                                    <th scope="row">${member['id']}</th>
                                                    <td>${member['first_name']}</td>
                                                    <td>${member['last_name']}</td>
                                                    <td>${member['gender']}</td>
                                                    <td>${member['birth_date']}</td>
                                                    <td>${member['member_since']}</td>
                                                    <td><button class="btn btn-primary delete" data-toggle="modal" data-target="#modal">Delete</button></td>
                                                    <td><button class="btn btn-primary edit" data-toggle="modal" data-target="#modal">Edit</button></td>
                                                </tr>`);
                }
            }
        });
    });
});