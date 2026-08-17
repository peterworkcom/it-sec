# [Overheard at Breakfast](https://tryhackme.com/room/hh-overheardatbreakfast-6f01793c)

> there is a link in the page that needs to be downloaded, but its content

- `lambobytelotushotel@gmail.com`
- `https://gravatar.com/`

> solution

- open a browser
- go to `https://gravatar.com/`
- update the url with some characters like `https://gravatar.com/qwe`
- it will give a **Not Find page**, but offers search by email
- paste the email `lambobytelotushotel@gmail.com`
- it will give back a string -> **VEhNe1MzY3JlVF9QcjBmaWwzX0g0c19iMzNuX0lkZW50MWZpM2R9**
- convert that string **from** `base64`
- `THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}`

> alternative

- `md5sum` the email and add that to the `https://gravatar.com/` url
