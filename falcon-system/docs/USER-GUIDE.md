# Falcon System – User Guide

## Roles
| | Admin | Sales boy |
|---|---|---|
| POS (pick product, set price, print bill) | ✔ | ✔ |
| Support tickets | all tickets | own tickets |
| Dashboard, Reports, Users, Settings, Backup | ✔ | – |
| Available, Stock, Invoices, Repairs | ✔ | only if the admin ticks them (Users → Extra pages) |
| Edit / delete stock & invoices | ✔ | only if the admin ticks "Can edit & delete" |

The admin can also block any account (**Users → Can log in**).

## POS – making a bill
1. Search, tap a brand chip, or type/scan a **serial number** and press **Enter** to add a laptop.
2. Tap **Add to order** on a product card (accessories have a − / + stepper).
3. Set the **Unit price** of each line.
4. Optional: **Discount**, **Shipping**, **Paid now** (leave blank when fully paid; a smaller amount creates a balance).
5. Choose Cash / Card / Bank transfer and fill in the customer (names you used before auto-fill phone and address).
6. **Place order & create invoice**, then **Print invoice (A4)** or **Print 80mm receipt**.
7. **Hold this bill** parks the bill while you serve someone else; **Recall** brings it back.

## Stock
* Click any cell in the table to edit it – it saves immediately. Status changes update availability automatically.
* **Search a model, then Apply price / Apply status** to change all matching items at once.
* **Add product** has every spec field plus a photo (choose a file or take a picture).
* **Import**: paste your sheet (with the header row) or upload a CSV. Tick *Update existing rows* to change
  items that already exist (matched by serial). **Export stock CSV** gives you a spreadsheet.
* ✎ opens the full editor and the product photo uploader; ✕ deletes.

## Invoices (admin)
* **View / Print**, **Edit** (customer, lines, quantities, prices, discount, shipping, paid, remove a wrong product,
  add another), **Delete** (choose whether stock returns), **Receive payment** for unpaid balances.
* Settings → *Next invoice number* controls numbering (starts at 12270).

## Repairs
Create a ticket, move it Received → In Progress → Completed, enter the final cost and warranty days.
Completed repairs count as income and show **Warranty until**.

## Support tickets
A sales boy reports a billing mistake (subject, optional invoice, message). The admin sees a badge, replies,
sets Open / In progress / Resolved, or jumps straight into the invoice to correct it.

## Reports & backup
**Monthly Report** shows income by month (sales net of discount/shipping + completed repairs) and exports CSV.
**Settings** holds company details, backup/restore and the "delete all sales history" button.
