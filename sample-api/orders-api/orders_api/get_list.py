import boto3
import os
import simplejson as json


def lambda_handler(message, context):

    if ('httpMethod' not in message or
            message['httpMethod'] != 'GET'):
        return {
            'statusCode': 400,
            'headers': {},
            'body': json.dumps({'msg': 'Bad Request'})
        }
    table_name = os.environ.get('ORDERS_TABLE')
    # table_name = os.environ.get('TABLE', 'Items')
    # region = os.environ.get('REGION', 'eu-west-2')
    item_table = boto3.resource('dynamodb')

    table = item_table.Table(table_name)

    response = table.scan()
    print(response)

    return {
        'statusCode': 200,
        'headers': {},
        'body': json.dumps(response['Items'])
    }