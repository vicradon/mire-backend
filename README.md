# Mire Backend

We're building in such a way that we collect FX and send ENaira.
So we need an FX collection service and an ENaira disbursement service.
Hope you don't mind that I'm using our chat as documentation brainstorming area?

We're assuming the FX collection service is abstracted. So we're building a kind of Flutterwave/Paystack flow where there are different options for receiving FX

Then we need the person sending to provide the wallet ID of the receiver.

types of transactions

- enaira to fx conversion
- fx

Focus on two types of transactions

- Send ENaira equivalent of FX to someone else
- Convert FX and send ENaira equivalent to self

## Before running transactions

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

npx sequelize-cli model:generate --name Transaction --attributes amount:string,user_id:string
