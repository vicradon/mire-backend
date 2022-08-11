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

```sql
DROP DATABASE IF EXISTS mire_dev;
CREATE DATABASE mire_dev;
```

```sh
npx sequelize-cli model:generate --name Transaction --attributes amount:string,user_id:string

```

```sh

```

## Transaction request

```json
{
  "amount": "100",
  "currency": "USD",
  "receiver_wallet_alias": "123456789"
}
```

## Create Virtual Account

```json
{
  "user_id": "123456789",
  "currency": "USD"
}
```

## Check Virtual Account Balance

```json
{
  "account_id": "123456789"
}
```

## Validate Receiver Wallet Alias

```json
{
  "wallet_alias": "123456789"
}
```

## Send ENaira to Receiver Wallet

```json
{
  "amount": "43000",
  "receiver_wallet_alias": "123456789"
}
```
