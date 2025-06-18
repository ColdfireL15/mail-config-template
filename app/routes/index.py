from flask import Blueprint, render_template, Response, url_for, redirect
import os
from dotenv import load_dotenv

load_dotenv()

index_bp = Blueprint('index', __name__)

DOMAIN = os.getenv('DOMAIN')

@index_bp.route('/')
def index():
    return render_template('index.html', DOMAIN=DOMAIN) 

@index_bp.route('/.well-known/autoconfig/mail/config-v1.1.xml')
def mail_config():
    domain = DOMAIN
    
    xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
    <emailProvider id="{domain}">
        <domain>{domain}</domain>
        <displayName>{domain} Email</displayName>
        <displayShortName>%EMAILLOCALPART%</displayShortName>
        <incomingServer type="imap">
            <hostname>mail.{domain}</hostname>
            <port>993</port>
            <socketType>SSL</socketType>
            <authentication>password-cleartext</authentication>
            <username>%EMAILADDRESS%</username>
        </incomingServer>
        <incomingServer type="pop3">
            <hostname>mail.{domain}</hostname>
            <port>995</port>
            <socketType>SSL</socketType>
            <authentication>password-cleartext</authentication>
            <username>%EMAILADDRESS%</username>
        </incomingServer>
        <outgoingServer type="smtp">
            <hostname>mail.{domain}</hostname>
            <port>465</port>
            <socketType>SSL</socketType>
            <authentication>password-cleartext</authentication>
            <username>%EMAILADDRESS%</username>
        </outgoingServer>
        <documentation url="https://autodiscover.{domain}">
            <descr lang="en">Generic settings page</descr>
            <descr lang="fr">Paramètres généraux</descr>
            <descr lang="es">Configuraciones genéricas</descr>
            <descr lang="de">Allgemeine Beschreibung der Einstellungen</descr>
            <descr lang="ru">Страница общих настроек</descr>
        </documentation>
    </emailProvider>
</clientConfig>'''
    
    return Response(xml_content, mimetype='application/xml')


@index_bp.route('/mail/config-v1.1.xml')
def mail_config_v1_1():
    return redirect(url_for('index.mail_config'))

@index_bp.route('/autodiscover/autodiscover.xml')
def autodiscover():
    domain = DOMAIN
    xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<Autodiscover>
    <Response>
        <User>
            <DisplayName>{domain}</DisplayName>
        </User>
        <Account>
            <AccountType>email</AccountType>
            <Action>settings</Action>
            <ServiceHome>https://autodiscover.{domain}</ServiceHome>
            <Protocol>
                <Type>IMAP</Type>
                <Server>mail.{domain}</Server>
                <Port>993</Port>
                <LoginName/>
                <DomainRequired>on</DomainRequired>
                <DomainName>{domain}</DomainName>
                <SPA>on</SPA>
                <SSL>on</SSL>
                <Encryption>SSL</Encryption>
                <AuthRequired>on</AuthRequired>
            </Protocol>
            <Protocol>
                <Type>POP</Type>
                <Server>mail.{domain}</Server>
                <Port>995</Port>
                <LoginName/>
                <DomainRequired>on</DomainRequired>
                <DomainName>{domain}</DomainName>
                <SPA>on</SPA>
                <SSL>on</SSL>
                <Encryption>SSL</Encryption>
                <AuthRequired>on</AuthRequired>
            </Protocol>
            <Protocol>
                <Type>SMTP</Type>
                <Server>mail.{domain}</Server>
                <Port>465</Port>
                <LoginName/>
                <DomainRequired>on</DomainRequired>
                <DomainName>{domain}</DomainName>
                <SPA>on</SPA>
                <SSL>on</SSL>
                <Encryption>SSL</Encryption>
                <AuthRequired>on</AuthRequired>
            </Protocol>
        </Account>
    </Response>
</Autodiscover>'''
    
    return Response(xml_content, mimetype='application/xml')