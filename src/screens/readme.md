## How the queueing system works when adding/editing login credentials

> The queue loads all incoming credentials from the existing-credentials AND new-credentials forms.

1. On start-up the queue will be loaded by all the credentials stored in the database (GET) - dB = allCredentials

2. The queue will be mapped and all credentials will be displayed inside the existing-credentials component

3. Any credentials that are edited inside existing-credentials and submitted will overwrite the old credentials in the queue

4. Any new credentials will be assigned an ID and added to the end of the queue

5. on Save, the queue will be ordered and saved to the dB (allCredentials)

##### Before any credential enters the queue, we check if it has an ID:

- If not, a unique ID will be assigned to it
- If yes, the incoming credential will simply overwrite the credential with the same ID in the queue. (added to the end if the ID is unique)

See under 'New' in the architecture diagram for a flow chart of the queue:

![alt text for screen readers](/Queueing-architecture.jpg 'Queing architecture')
