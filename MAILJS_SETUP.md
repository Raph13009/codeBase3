# Configuration MailJS

## Étapes pour configurer MailJS

### 1. Créer un compte MailJS
- Allez sur [mailjs.com](https://mailjs.com)
- Créez un compte gratuit
- Vérifiez votre email

### 2. Configurer le service Email
- Dans votre dashboard MailJS, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
- Suivez les instructions pour connecter votre compte email
- Notez le **Service ID** généré

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

```html
Nouveau message de contact depuis le site BoostAI

Nom: {{from_name}}
Email: {{from_email}}
Message: {{message}}

Ce message a été envoyé depuis le formulaire de contact du site web.
```

- Notez le **Template ID** généré

### 4. Obtenir votre clé publique
- Allez dans "Account" > "API Keys"
- Copiez votre **Public Key**

### 5. Configurer le code
- Ouvrez le fichier `src/lib/emailService.ts`
- Remplacez les valeurs par vos vraies clés :

```typescript
const SERVICE_ID = 'votre_service_id';
const TEMPLATE_ID = 'votre_template_id';
const PUBLIC_KEY = 'votre_public_key';
```

### 6. Activer l'envoi réel
- Dans `src/lib/emailService.ts`, changez :
```typescript
// Remplacer cette ligne :
const result = await sendEmailDev(templateParams);

// Par celle-ci :
const result = await sendEmail(templateParams);
```

### 7. Tester
- Remplissez le formulaire sur le site
- Vérifiez que l'email arrive dans votre boîte de réception

## Notes importantes
- En développement, le formulaire simule l'envoi (voir console)
- En production, remplacez `sendEmailDev` par `sendEmail`
- Les emails gratuits sont limités à 200 par mois
- Pour plus d'emails, passez à un plan payant

## Variables disponibles dans le template
- `{{from_name}}` : Nom complet de l'expéditeur
- `{{from_email}}` : Email de l'expéditeur
- `{{message}}` : Message du formulaire
- `{{to_name}}` : Nom du destinataire (BoostAI Team)
- `{{reply_to}}` : Email de réponse 